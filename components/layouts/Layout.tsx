import Footer from '../Footer';
import Navigation from '../Navigation';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation></Navigation>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
