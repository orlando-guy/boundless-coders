# Contributing to BOUNDLESS CODERS

I would love for you to contribute to BOUNDLESS CODERS and help make it even better than it is today! As a contributor, here are the guidelines I would like you to follow:

- [Issues and Bugs](#found-a-bug)
- [Missing a Feature?](#missing-a-feature)
- [submission Guidelines](#submission-guidelines)
- [Submitting a Pull Request (PR)](#submitting-a-pull-request)
- [Commit Message Guidelines](#commit-message-format)

## Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submitting-an-issue) to our [GitHub Repository][github].
Even better, you can [submit a Pull Request](#submitting-a-pull-request) with a fix.

## Missing a Feature?

You can *request* a new feature by [submitting an issue](#submitting-an-issue) to our GitHub Repository.
If you would like to *implement* a new feature, please consider the size of the change in order to determine the right steps to proceed:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed.
  This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

  **Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

- **Small Features** can be crafted and directly [submitted as a Pull Request](#submitting-a-pull-request).

## Submission Guidelines

### Submitting an Issue

Before you submit an issue, please search the issue tracker. An issue for your problem might already exist and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug, we need to reproduce and confirm it.
In order to reproduce bugs, we require that you provide a minimal reproduction.
Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

We require a minimal reproduction to save maintainers' time and ultimately be able to fix more bugs.
Often, developers find coding problems themselves while preparing a minimal reproduction.
We understand that sometimes it might be hard to extract essential bits of code from a larger codebase, but we really need to isolate the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you, we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by selecting from our [new issue templates](https://github.com/orlando-guy/boundless-coders/issues/new/choose) and filling out the issue template.

## Submitting a Pull Request

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/orlando-guy/boundless-coders/pulls) for an open or closed PR that to your submission. You don't want to duplicate existing efforts.

2. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add. Discussing the design upfront helps to ensure that we're ready to accept work.

3. In forked repostory, make your changes in a new git branch:

    ```shell
    git checkout -b my-fix-branch main
    ```

4. Create your patch, **including appropriate test cases**.

5. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-format).

    ```shell
    git commit --all
    ```

    Note: the optional commit `--all` command line option will automatically "add" and "rm" edited files.

6. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

7. In the GitHub send a request to `boundless-coders:main`

### Addressing review feedback

If we ask for changes via code reviews then:

1. Make the required updates to the code.

2. Re-run the test suites to ensure tests are still passing.

3. Create a fixup commit and push to your GitHub repository (this will update your Pull Request):

    ```shell
    git commit --all --fixup HEAD
    git push
    ```

    For more info on working with fixup commits see [here](docs/FIXUP_COMMITS.md).

That's it! Thank you for your contribution!

## Commit Message Format

*This specification is inspired by The angular commit message format*

We have very precise rules over how our Git commit messages must be formatted.  
This format leads to **easier to read commit history**.

your commit message should follow the structure:

```php
<type>(<scope>): <message>
```

where:

- **`<type>`**: Describes the purpose of the commit (e.g., `feat`, `fix`, `chore`, `docs`, etc.).
- **`<scope>`**: Optional. Describes the module, component, or feature area affected by the commit.
- **`<message>`**: A concise and clear description of the change in present tense. Not capitalized. Not period at the end.

### Commit Types

- **feat**: A new feature for the  user.
- **fix**: A bug fix for the user.
- **chore**: Routine tasks, maintenance, or tooling changes.
- **docs**: Documentation changes.
- **style**: Code style changes (formatting, indentation).
- **refactor**: Code changes that neither fix a bug nor add feature.
- **test**: Adding or modifying tests.

### Examples

Adding new feature:

```scss
feat(challenge): add ability to archive challenge
```

Fixing a bug:

```scss
fix(solutions): resolve issue with incorrect timestamps
```

Routine maintenance:

```makefile
chore: update dependencies
```

Updating documentations:

```scss
docs(readme): clarify contribution guidelines
```

Changing code style:

```scss
style(project): improve indentation in main.ts
```

Refactoring codes:

```scss
refactor(users): simplify authentication logic
```

Adding or modifying tests:

```scss
test(contributions): add unit tests for ContributionService
```

### Additional Tips

- Use imperative mode in the `<message>` part (e.g., "add", "fix", "update").
- Keep each commit focused on a single change or fix.
- Use `!` after `<type>` to indicate breaking changes (e.g., `feat!`).
- Reference issues or tasks in the commit message when applicable (e.g., `fix(users): resolve #123`).

[github]: https://github.com/orlando-guy/boundless-coders
