import { Menu, Container, Image, Icon, MenuItem } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { handleLogout } from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();
function Header({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot || isAdmin



  function isActive(route) {
    return route == router.pathname;
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <MenuItem header active={isActive('/')}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: '1em' }}
            />
            GloriReact
          </MenuItem>
        </Link>
        <Link href="/cart" >
          <MenuItem header active={isActive('/cart')}>
            <Icon name="cart" size="large" />
            Cart
          </MenuItem>
        </Link>
        {isRootOrAdmin && (<Link href="/create" >
          <MenuItem header active={isActive('/create')}>
            <Icon name="add square" size="large" />
            Create
          </MenuItem>
        </Link>)}

        {user ? (<>
          <Link href="/account">
            <MenuItem header active={isActive('/account')}>
              <Icon name="user" size="large" />
           Account
          </MenuItem>
          </Link>


          <MenuItem onClick={handleLogout} header>
            <Icon name="sign out" size="large" />
           Logout
        </MenuItem>
        </>)
          :
          (<>
            <Link href="/login">
              <MenuItem header active={isActive('/login')}>
                <Icon name="sign in" size="large" />
            Login
          </MenuItem>
            </Link>

            <Link href="/signup">
              <MenuItem header active={isActive('/signup')}>
                <Icon name="signup" size="large" />
            Signup
          </MenuItem>
            </Link>
          </>)}

      </Container>
    </Menu>
  );
}

export default Header;
