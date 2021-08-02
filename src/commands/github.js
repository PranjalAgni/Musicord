const got = require('got');

const getLatestUpdatedRepo = async (username) => {
  let latestRepo = {
    userExist: false,
    hasRepos: false,
    repoName: null,
  };
  try {
    const BASE_URL = `https://api.github.com/users/${username}/repos`;
    const searchParams = new URLSearchParams([
      ['sort', 'updated'],
      ['per_page', 1],
    ]);
    const { body } = await got(BASE_URL, {
      searchParams,
      responseType: 'json',
    });

    latestRepo = {
      userExist: true,
      hasRepos: !!body.length,
      repoName: body.length ? body[0].name : null,
    };
  } catch (ex) {
    const errorBody = ex.response.body;
    console.error('Error occured: ', errorBody);
    latestRepo.userExist = errorBody.message !== 'Not Found';
  }
  return latestRepo;
};

const getLatestUserCommit = async (username, reponame) => {
  let latestCommitData = {
    date: null,
    message: null,
  };
  try {
    const searchParams = new URLSearchParams([['author', username]]);
    const BASE_API_URL = `https://api.github.com/repos/${username}/${reponame}/commits`;
    const { body } = await got(BASE_API_URL, {
      searchParams,
      responseType: 'json',
    });

    const { commit: commitData } = body[0];
    latestCommitData = {
      date: commitData.committer.date,
      message: commitData.message,
    };
  } catch (ex) {
    const errorBody = ex.response.body;
    console.error('Error occured: ', errorBody);
  }

  return latestCommitData;
};

const handler = async (message, args) => {
  if (!args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
  }

  const githubUsername = args[0];
  const latestRepo = await getLatestUpdatedRepo(githubUsername);
  if (!latestRepo.userExist) {
    return message.channel.send(`${githubUsername} doesn't exists`);
  }

  if (!latestRepo.hasRepos) {
    return message.channel.send(`${githubUsername} has no repos`);
  }

  const latestCommitData = await getLatestUserCommit(
    githubUsername,
    latestRepo.repoName
  );
  return message.channel.send(
    `Hi ${githubUsername} your last commit message was: ${latestCommitData.message} 💚`
  );
};

// Todo:
// 1. [x] Github API to fetch the latest updated repo by username
// 2. [x] Get the repo name from latest updated repo
// 3. Github API to fetch the latest commit of that user in the above repo
// 4. Reply with a colorful message about the commit message, last commited time
// 5. Also replace the emoji tags withe emoji in the commit message (* extra)

module.exports = {
  name: 'github',
  description: 'When was last commit done to Github',
  execute: handler,
};
