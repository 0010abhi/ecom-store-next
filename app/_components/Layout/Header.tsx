import HeaderBanner from "./HeaderBanner";
import Link from "next/link";
import headerLinks from "../../../config/header-links.json";
import LogInButton from "../LogInButton";
import MobileMenu from "./MobileMenu";

export default function HeaderPublic() {
    return (<header>
        {/* Promotional Banner At Top */}
        <HeaderBanner />
        <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '120px', minWidth: '1200px', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left Part */}
            <div style={{ flexGrow: 2, flexDirection: 'row', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
                {
                    headerLinks.filter((link: any) => link && !link.component).map((link, index) => {
                        return (
                            <div key={'header-link-' + link.text}>
                                <Link href={link.path}>{link.text}</Link>
                            </div>
                        );
                    })
                }
            </div>
            {/* Right Part */}
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '20px' }}>
                {
                    headerLinks.filter((link: any) => link && link.component).map((link, index) => {
                        return (
                            <div key={'header-link-' + link.text}>
                                <Link href={link.path}>
                                    <LogInButton />
                                </Link>
                            </div>

                        );
                    })
                }
                {/* Mobile Menu */}
                <MobileMenu />
            </div>
        </div>
    </header>)
}