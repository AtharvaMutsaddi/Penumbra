import React from 'react'
import { X,ArrowBigRight } from 'lucide-react';
import { Link } from 'react-router-dom';
function Navbar(props) {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{props.socialMediaPlatform+"-"+props.postCategory} Analytics Dashboard</h1>
                    {props.clickable && <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white">
                        <Link to={`/suggestions/${props.socialMediaPlatform}/${props.postCategory}`}>
                        Get AI Suggestions <ArrowBigRight />
                        </Link>
                    </button>}
                </div>
            </div>
        </header>
    )
}

export default Navbar
Navbar.defaultProps={
    socialMediaPlatform:'Default',
    clickable:false,
    logo:"none",
    postCategory:'general'
}