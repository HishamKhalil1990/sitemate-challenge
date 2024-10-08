const apis = require('./apis/apis')
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function createIssue() {
  let validTitle = false;
  let title;

  do {
    title = await new Promise((resolve) => {
      rl.question(
        '\nTitle --> Must be between 2 and 30 characters long\n✏️  Enter issue title: ',
        (input) => {
          if (input.length < 2 || input.length > 30) {
            console.error(
              chalk.red('\nError: Incorrect value, please enter again!'),
            );
          } else {
            validTitle = true;
          }
          resolve(input);
        },
      );
    });
  } while (!validTitle);

  let validDescription = false;
  let description;

  do {
    description = await new Promise((resolve) => {
      rl.question(
        '\nIssue Description --> Must be between 20 and 200 characters long.\n✏️  Enter issue description: ',
        (input) => {
          if (input.length < 20 || input.length > 200) {
            console.error(
              chalk.red('\nError: Incorrect value, please enter again!'),
            );
          } else {
            validDescription = true;
          }
          resolve(input);
        },
      );
    });
  } while (!validDescription);

  try {
    const issueData = {
      title: title,
      description: description,
    };

    await apis.createIssue(issueData);
    console.log(chalk.green('\n✅ Issue created successfully!!!'));
  } catch (error) {
    console.log('o erro é:', error.response.data);
    console.error(
      chalk.red('Error creating issue:'),
      error.response.data.message,
    );
  } finally {
    rl.close();
  }
}

async function updateIssue() {
  rl.question('Enter issue ID to edit: ', async (id) => {
    let validTitle = false;
    let title;

    do {
      title = await new Promise((resolve) => {
        rl.question(
          '\nTitle --> Must be between 2 and 30 characters long\n✏️  Enter new issue title: ',
          (input) => {
            if (input.length < 2 || input.length > 30) {
              console.error(
                chalk.red('\nError: Incorrect value, please enter again!'),
              );
            } else {
              validTitle = true;
            }
            resolve(input);
          },
        );
      });
    } while (!validTitle);

    let validDescription = false;
    let description;

    do {
      description = await new Promise((resolve) => {
        rl.question(
          '\nIssue Description --> Must be between 20 and 200 characters long.\n✏️  Enter new issue description: ',
          (input) => {
            if (input.length < 20 || input.length > 200) {
              console.error(
                chalk.red('\nError: Incorrect value, please enter again!'),
              );
            } else {
              validDescription = true;
            }
            resolve(input);
          },
        );
      });
    } while (!validDescription);

    try {
      await apis.updateIssue(id, {
        title,
        description,
      });
      console.log(chalk.green('\n✅ Issue updated successfully!!!'));
    } catch (error) {
      console.error('Error updating issue:', error.message);
    } finally {
      rl.close();
    }
  });
}

async function getIssues() {
  try {
    const issues = await apis.getIssue();
    console.log('All Issues:', issues.result);
  } catch (error) {
    console.error('Error fetching issues:', error.message);
  } finally {
    rl.close();
  }
}

function deleteIssue() {
  rl.question('Enter issue ID to delete: ', async (id) => {
    try {
      await apis.deleteIssue(id);
      console.log(chalk.green('\n✅ Issue deleted successfully!!!'));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(
          chalk.red('Issue ID not found or error occurred: Bad Request'),
        );
      } else {
        console.error(chalk.red('An error occurred:', error.message));
      }
    } finally {
      rl.close();
    }
  });
}

function start() {
  console.log(
    chalk.bold.magenta(
      '\nIssue Management System - By Amanda Fernandes (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧\n',
    ),
  );

  console.log('1- Create Issue');
  console.log('2- Edit Issue');
  console.log('3- View All Issues');
  console.log('4- Delete Issue');

  rl.question('\nEnter your choice (1-4): ', (choice) => {
    switch (choice) {
      case '1':
        createIssue();
        break;
      case '2':
        updateIssue();
        break;
      case '3':
        getIssues();
        break;
      case '4':
        deleteIssue();
        break;
      default:
        console.log('Invalid choice.');
        rl.close();
    }
  });
}

start();
