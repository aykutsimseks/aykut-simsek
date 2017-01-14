

import { fade } from 'material-ui/utils/colorManipulator';

const palette = {
  primary1Color: '#ff5E60',

  textColor: '#000',
  secondaryTextColor: '#aaa',

  alternateTextColor: '#fff',

  accent1Color: '#fff',
  borderColor: '#fff',
};

export default {
  fontFamily: 'Roboto, sans-serif',
  palette,
  dropDownMenu: {
    accentColor: '#fff',
    style: {
      color: '#fff',
    },
  },
  menuItem: {
    selectedTextColor: palette.primary1Color,
  },
  inkBar: {
    backgroundColor: palette.accent1Color,
  },
  textField: {
    floatingLabelColor: palette.secondaryTextColor,
  },
  tabs: {
    backgroundColor: palette.primary1Color,
    textColor: fade(palette.alternateTextColor, 0.5),
    selectedTextColor: palette.alternateTextColor,
  },
  svgIcon: {
    color: '#fff',
  },
};
