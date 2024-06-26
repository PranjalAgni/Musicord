const countdown = require('countdown');
const { MessageEmbed } = require('discord.js');
const gotClient = require('../utils/got');

// Todo:
// 1. [x] Github API to fetch the latest updated repo by username
// 2. [x] Get the repo name from latest updated repo
// 3. [x] Github API to fetch the latest commit of that user in the above repo
// 4. [x] Reply with a colorful message about the commit message, last commited time
// 5. (discord is handling it automatically) Also replace the emoji tags withe emoji
// in the commit message (* extra)

const getLatestUpdatedRepo = async (username, numberOfRepos) => {
  let latestRepo = {
    userExist: false,
    hasRepos: false,
    repoNames: null,
  };
  try {
    const BASE_URL = `https://api.github.com/users/${username}/repos`;
    const searchParams = new URLSearchParams([
      ['sort', 'updated'],
      ['per_page', numberOfRepos],
    ]);
    const { body } = await gotClient(BASE_URL, {
      searchParams,
      responseType: 'json',
    });

    const repoNames = body.map((repo) => repo.name);
    latestRepo = {
      userExist: true,
      hasRepos: !!body.length,
      repoNames,
    };
  } catch (ex) {
    const errorBody = ex.response.body;
    console.error('Error occured: ', errorBody);
    latestRepo.userExist = errorBody.message !== 'Not Found';
  }
  return latestRepo;
};

const getCommitsInformation = async (username, repoNameList) => {
  const commitsInfoList = [];

  try {
    for (let idx = 0; idx < repoNameList.length; idx += 1) {
      const reponame = repoNameList[idx];
      const searchParams = new URLSearchParams([['author', username]]);
      const BASE_API_URL = `https://api.github.com/repos/${username}/${reponame}/commits`;
      // eslint-disable-next-line no-await-in-loop
      const { body } = await gotClient(BASE_API_URL, {
        searchParams,
        responseType: 'json',
      });

      if (body.length) {
        const { commit: commitData } = body[0];
        const latestCommitData = {
          date: commitData.committer.date,
          message: commitData.message,
          repoName: reponame,
        };
        commitsInfoList.push(latestCommitData);
      }
    }
  } catch (ex) {
    const errorBody = ex.response.body;
    console.error(
      'Error occured while fetching user latest commits: ',
      errorBody
    );
  }

  return commitsInfoList;
};

const getFormattedMessage = (commitsInfoList) => {
  /**
   * 1 repoName commitMessage timeCommitted
   * 2 repoName commitMessage timeCommitted
   */

  const formattedMessageList = commitsInfoList.map((commit, idx) => {
    const timeElapsed = countdown(new Date(commit.date)).toString();
    return `${idx + 1} ${commit.repoName} with message ${
      commit.message
    } time ago ${timeElapsed}`;
  });

  return formattedMessageList.join('\n\n');
};

const handler = async (message, args) => {
  if (!args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
  }

  const githubUsername = args[0];
  const numberOfRepos = parseInt(args[1], 10) || 1;
  const latestRepo = await getLatestUpdatedRepo(githubUsername, numberOfRepos);
  if (!latestRepo.userExist) {
    return message.channel.send(`${githubUsername} doesn't exists`);
  }

  if (!latestRepo.hasRepos) {
    return message.channel.send(`${githubUsername} has no repos`);
  }

  const commitsInfoList = await getCommitsInformation(
    githubUsername,
    latestRepo.repoNames
  );

  if (!commitsInfoList.length) {
    return message.channel.send(
      `Hi ${githubUsername} you haven't been done any commits recently 💚`
    );
  }

  const formattedDescription = getFormattedMessage(commitsInfoList);

  const embed = new MessageEmbed()
    .setTitle(`Hi ${githubUsername}`)
    .setColor('0099ff')
    .setDescription(formattedDescription);
  return message.channel.send(embed);
};

module.exports = {
  name: 'github',
  description: 'When was last commit done to Github',
  execute: handler,
};
