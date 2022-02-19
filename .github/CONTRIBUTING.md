# Contributing

Before you go ahead and submit a pull request, please take your time and consider what your patch does:

1. Is it introducing a new feature?
2. Is it fixing a bug?
3. Is it a trivial change (e.g. typo)

## 1. Introducing New Features

First try to think about the necessity of introducing that new feature into old code instead of making a new extension.

If it completely overhauls the inner workings of an existing extension, you might be better off implementing your idea
as a stand-alone one. Now, this does not mean you aren't allowed to touch existing code -- if you wish to make
extensions able to interact with each other, feel free to implement exactly that type of interconnectivity.

If it just adds cosmetics, you can consider that a trivial change instead.

## 2. Fixing a Bug

Before you submit your patch to fix a bug, please first open an issue so that the suspected bug can be discussed in
detail. If it turns out to not be an issue, you've just saved yourself some considerable efforts.

Alternatively, feel free to go through open issues and fix those -- for that, just go ahead and open a pull request
linking to the issue that discusses the bug.

## 3. Trivial Changes

Trivial changes are changes that are considered, well, easy. This is usually a quite restricted set of things:

1. Typos, both in code-space and user-space
2. Cosmetic changes (e.g. an image here or there)
3. Changing text to be easier to read / grammatically correct

If you're unsure whether your patch is trivial, please first open an issue discussing your proposed changes.

## Submitting Your Patch

After you've done any of the above, it's time to submit your patch!

To do that, follow these steps:

1. Fork the repository
2. Checkout a new branch (`git checkout -b my-branch`)
3. Write and commit your changes
4. Submit a pull request to `master`

---

Happy hacking!
