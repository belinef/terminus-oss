'use strict';

module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature',
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix',
    },
    {
      value: 'style',
      name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'test',
      name: 'test:     Adding missing tests',
    },
    {
      value: 'chore',
      name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit',
    },
    {
      value: 'WIP',
      name: 'WIP:      Work in progress',
    },
  ],

  scopes: [
    // UI packages
    { name: 'Autocomplete' },
    { name: 'Autofocus' },
    { name: 'Button' },
    { name: 'Card' },
    { name: 'Chart' },
    { name: 'Checkbox' },
    { name: 'Chip' },
    { name: 'CohortDateRange' },
    { name: 'Confirmation' },
    { name: 'Copy' },
    { name: 'CSVEntry' },
    { name: 'DateRange' },
    { name: 'Drawer' },
    { name: 'EmptyState' },
    { name: 'ExpansionPanel' },
    { name: 'FileUpload' },
    { name: 'FormField' },
    { name: 'Icon' },
    { name: 'IconButton' },
    { name: 'InfoCarousel' },
    { name: 'Input' },
    { name: 'Link' },
    { name: 'LoadingOverlay' },
    { name: 'LoginForm' },
    { name: 'Logo' },
    { name: 'Menu' },
    { name: 'Navigation' },
    { name: 'Option' },
    { name: 'PageHeader' },
    { name: 'Paginator' },
    { name: 'Pipes' },
    { name: 'Popover' },
    { name: 'RadioGroup' },
    { name: 'Scrollbars' },
    { name: 'Search' },
    { name: 'Select' },
    { name: 'SelectionList' },
    { name: 'Sidenav' },
    { name: 'Sort' },
    { name: 'Spacing' },
    { name: 'Styles' },
    { name: 'Table' },
    { name: 'Tabs' },
    { name: 'Toggle' },
    { name: 'Tooltip' },
    { name: 'Utilities' },
    { name: 'ValidationMessages' },
    { name: 'Validators' },

    // Non-UI packages
    { name: 'DesignTokens' },
    { name: 'ESLintConfig' },
    { name: 'FEJwt' },
    { name: 'FETesting' },
    { name: 'FEUtilities' },
    { name: 'StylelintConfig' },

    // Dev
    { name: 'CI' },
    { name: 'Storybook' },
    { name: 'Dependencies' },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'revert', 'chore'],
};
