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

function getAllFiles(dirPath, arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.join(basePath, file);
    
    if (file === 'node_modules' || file === '.git' || file === '.cache') {
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
  
  console.log(`Creating repository: ${repoName}...`);
  let repo;
  try {
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'Personal Portfolio - Full Stack Developer | Built with React, Vite, and Tailwind CSS',
      private: false,
      auto_init: false
    });
    repo = data;
    console.log(`Repository created: ${repo.html_url}`);
  } catch (error) {
    if (error.status === 422) {
      console.log('Repository already exists, fetching it...');
      const { data } = await octokit.repos.get({
        owner: user.login,
        repo: repoName
      });
      repo = data;
      console.log(`Using existing repository: ${repo.html_url}`);
    } else {
      throw error;
    }
  }

  console.log('Collecting files from portfolio...');
  const projectPath = './illustration-portfolio-mainzipzip-1';
  const files = getAllFiles(projectPath);
  console.log(`Found ${files.length} files to upload`);

  const blobs = [];
  for (const file of files) {
    const content = fs.readFileSync(file.fullPath);
    const encoding = isTextFile(file.path) ? 'utf-8' : 'base64';
    const fileContent = encoding === 'base64' ? content.toString('base64') : content.toString('utf-8');
    
    try {
      const { data: blob } = await octokit.git.createBlob({
        owner: user.login,
        repo: repoName,
        content: fileContent,
        encoding: encoding
      });
      
      blobs.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
      process.stdout.write('.');
    } catch (err) {
      console.error(`\nFailed to upload: ${file.path}`);
    }
  }
  console.log('\nFiles uploaded!');

  console.log('Creating commit...');
  const { data: tree } = await octokit.git.createTree({
    owner: user.login,
    repo: repoName,
    tree: blobs
  });

  const { data: commit } = await octokit.git.createCommit({
    owner: user.login,
    repo: repoName,
    message: 'Initial commit - Pranav Borse Portfolio',
    tree: tree.sha
  });

  try {
    await octokit.git.createRef({
      owner: user.login,
      repo: repoName,
      ref: 'refs/heads/main',
      sha: commit.sha
    });
  } catch (e) {
    await octokit.git.updateRef({
      owner: user.login,
      repo: repoName,
      ref: 'heads/main',
      sha: commit.sha,
      force: true
    });
  }

  console.log('\n========================================');
  console.log('SUCCESS! Your portfolio is now on GitHub!');
  console.log(`Repository URL: ${repo.html_url}`);
  console.log('========================================');
}

function isTextFile(filePath) {
  const textExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.md', '.txt', '.svg', '.xml', '.yml', '.yaml', '.mjs', '.cjs'];
  const ext = path.extname(filePath).toLowerCase();
  return textExtensions.includes(ext);
}

main().catch(console.error);
