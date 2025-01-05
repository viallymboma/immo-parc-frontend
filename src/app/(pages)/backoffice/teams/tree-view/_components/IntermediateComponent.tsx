"use client";

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/common/backbone/ReturnHeader';
import {
  Dashboard2SvgIcon,
  NewHamburgerSvgIcon,
} from '@/components/svgs/SvgIcons';
import useFetchAllGenerations from '@/hooks/useFetchAllGenerations';
import { useTaskStore } from '@/store/task-store';

import FolderViewComponent from './FolderViewComponent';
import TreeViewComponent from './TreeViewComponent';

// SWR fetcher function
const fetcher = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    });

const IntermediateComponent = ({ userId }: { userId: string }) => {

    const [ displayView, setDisplayView ] = useState <boolean> (false); 
    const [ colorHiglight, setColorHiglight ] = useState <string> ("#fff"); 
    const [ colorHiglight2, setColorHiglight2 ] = useState <string> ("#000"); 
    const [showScrollTop, setShowScrollTop] = useState(false); 
    const containerRef = React.useRef<HTMLDivElement>(null); 

    const { loggedInUserFamilyTreeData, isValidating, error } = useFetchAllGenerations (); 
    const { loggedInUserFamilyTreeInStore } = useTaskStore(); 


    const router = useRouter (); 
    
    if (isValidating) {
        return <p>Loading team data...</p>;
    }
    
    if (error) {
        return (
            <div className="mx-auto max-w-7xl">
                <Breadcrumb pageName="Visuel de mon equipe" />
                <ReturnHeader
                    headerName="Mon equipe"
                    returnBtnLabel="Retour"
                    returnLink="/backoffice"
                />
                <div>
                    <p>Error fetching team data: {error.message}</p>
                </div>
            </div>
        );
    }

    // Scroll to top function
    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle scroll to show/hide the scroll to top button
    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop } = containerRef.current;
            setShowScrollTop(scrollTop > 5); // Show button if scrolled more than 100px
        }
    };

    const showTreeView = () => {
        setDisplayView (false)
        setColorHiglight ("#fff"); 
        setColorHiglight2 ("#000"); 
    }

    const showFolderView = () => {
        setDisplayView (true); 
        setColorHiglight ("#000"); 
        setColorHiglight2 ("#fff"); 
    }

    return (
        <div className='relative overflow-y-auto' onScroll={handleScroll}>
            <div>
                <div className=' flex gap-2'>
                    {/* <button onClick={() => showTreeView ()} className={`${ displayView ? "bg-white" : "bg-transparent" } `}>
                        <NewHamburgerSvgIcon color={`${ displayView ? "#000" : "#fff" }`} />
                    </button>
                    <button onClick={() => showFolderView ()} className={`${ displayView ? "bg-transparent" : "bg-white" } `}>
                        <Dashboard2SvgIcon color={`${ displayView ? "#fff" : "#000" }`}  />
                    </button> */}
                    <button onClick={() => showTreeView ()} style={{ backgroundColor: `${ colorHiglight }` }} className={`p-2 rounded-full `}>
                        <NewHamburgerSvgIcon  color={`${ colorHiglight2 }`} />
                    </button>
                    <button onClick={() => showFolderView ()} style={{ backgroundColor: `${ colorHiglight2 }` }} className={`p-2 rounded-full `}>
                        <Dashboard2SvgIcon color={`${ colorHiglight }`} />
                    </button>
                </div>
            </div>
            <div className='mb-[5rem]'>
                {
                    displayView ? 
                        <FolderViewComponent loggedInUserFamilyTreeInStore={ loggedInUserFamilyTreeInStore } />
                        :
                        <TreeViewComponent loggedInUserFamilyTreeInStore={ loggedInUserFamilyTreeInStore } />
                }
            </div>
            {/* Scroll to Top Button  */}
            {/* {showScrollTop && (
            )} */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-[15%] w-[100px] z-30 text-[20px] right-4 bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-full shadow-lg"
                >
                    ↑
                </button>
        </div>
    )
}

export default IntermediateComponent