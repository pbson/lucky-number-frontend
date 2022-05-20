import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children, title, description, ogImage, url }: any) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <style jsx global>
                {`
          html,
          body {
            background: #08121C;
            overflow-x: hidden;
            padding: 0 !important;
          }
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
        `}
            </style>
        </>
    );
};

export default Layout;