import Header from './Header';
import Footer from './Footer';

function PrimaryLayout({ children }) {
    return (
        <div className="">
            <Header />
            <div className="mx-auto min-h-svh w-[1250px] justify-items-center pb-12 pt-6">{children}</div>
            <Footer />
        </div>
    );
}

export default PrimaryLayout;
