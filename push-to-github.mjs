import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';

let connectionSettings = null;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.cache',
  '.config',
  '.local',
  '.replit',
  'replit.md',
  'push-to-github.mjs',
  'package-lock.json',
  '.upm'
];

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getAllFiles(dirPath, arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const relativePath = basePath ? path.join(basePath, file) : file;
    
    if (shouldIgnore(relativePath)) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles, relativePath);
    } else {
      arrayOfFiles.push({
        path: relativePath.replace(/\\/g, '/'),
        fullPath: fullPath
      });
    }
  });

  return arrayOfFiles;
}

async function main() {
  const repoName = process.argv[2] || 'pranav-portfolio';
  
  console.log('Connecting to GitHub...');
  const octokit = await getGitHubClient();
  
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Logged in as: ${user.login}`);
  
  try {
    console.log(`Deleting existing empty repository: ${repoName}...`);
    await octokit.repos.delete({
      owner: user.login,
      repo: repoName
    });
    console.log('Deleted successfully.');
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    if (error.status !== 404) {
      console.log('Repository does not exist or cannot be deleted.');
    }
  }

  console.log(`Creating fresh repository: ${repoName}...`);
  const { data: repo } = await octokit.repos.createForAuthenticatedUser({
    name: repoName,
    description: 'Personal Portfolio - Full Stack Developer | Built with React, Vite, and Tailwind CSS',
    private: false,
    auto_init: true
  });
  console.log(`Repository created: ${repo.html_url}`);
  
  console.log('Waiting for repository to initialize...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('\nCollecting files...');
  const files = getAllFiles('.');
  console.log(`Found ${files.length} files to upload\n`);

  console.log('Uploading files to GitHub...');
  let uploaded = 0;
  let failed = 0;
  
  for (const file of files) {
    const content = fs.readFileSync(file.fullPath);
    const base64Content = content.toString('base64');
    
    try {
      await octokit.repos.createOrUpdateFileContents({
        owner: user.login,
        repo: repoName,
        path: file.path,
        message: `Add ${file.path}`,
        content: base64Content
      });
      uploaded++;
      process.stdout.write(`\rUploaded: ${uploaded}/${files.length}`);
    } catch (err) {
      failed++;
      console.error(`\nFailed to upload: ${file.path} - ${err.message}`);
    }
  }
  
  console.log(`\n\nUpload complete! ${uploaded} files uploaded, ${failed} failed.`);
  console.log('\n==========================================');
  console.log('SUCCESS! Your portfolio is now on GitHub!');
  console.log(`Repository: ${repo.html_url}`);
  console.log('==========================================');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
