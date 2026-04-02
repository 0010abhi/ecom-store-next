'use client';

import HeaderBanner from "./HeaderBanner";
import Link from "next/link";
import headerLinks from "../../config/header-links.json";
import LogInButton from "../LogInButton";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import logo from '../../../public/logoipsum-408.svg';
import { useAuth } from "../../_context/AuthContext";
import CartButton from "../Profile/CartButton";
import ProfileMenu from "../Profile/ProfileMenu";

export default function HeaderPublic() {
    const { user, loading } = useAuth();

    return (<header>
        {/* Promotional Banner At Top */}
        <HeaderBanner />
        <div style={{
            display: 'flex', flexDirection: 'row',
            maxHeight: '120px', minWidth: '600px', width: '100%',
            alignItems: 'center', justifyContent: 'space-between', padding: '15px 25px'
        }}>
            <div>
                <Image src={logo} alt="Logo" width={300} height={30} />
            </div>
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
                {loading ? null : user ? (
                    <>
                        <CartButton />
                        <ProfileMenu />
                    </>
                ) : (
                    <Link href="/login">
                        <LogInButton />
                    </Link>
                )}
                {/* Mobile Menu */}
                <MobileMenu />
            </div>
        </div>
    </header>)
}