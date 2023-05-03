import Login from '@screens/Login'
import Home from '@screens/Home'
import CreateAccount from '@screens/CreateAccount'

function getName(name) {
  return {
    name,
    translationId: `screen.${name.split(' ').join('_').toLowerCase()}.title`,
  }
}

export const routes = [
  {
    ...getName('Login'),
    component: Login,
    options: {
      headerTitle: '',
    },
  },
  {
    ...getName('Create Account'),
    component: CreateAccount,
  },
  {
    ...getName('Home'),
    component: Home,
  },
]
