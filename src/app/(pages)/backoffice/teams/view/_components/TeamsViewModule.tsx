"use client";
import React from 'react';

import useSWR from 'swr';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/common/backbone/ReturnHeader';
import UserTable from '@/components/Tables/AllTables/UserTable';
import { BASE_API_URL } from '@/lib/constants';

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

const TeamsViewModule = ({ userId }: { userId: string }) => {
    const { data, error, isLoading } = useSWR(
        `${BASE_API_URL}/users/${userId}/children`,
        fetcher
    );
    
    if (isLoading) {
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

    console.log(data, "is fetching...")
    return (
        <div className="mx-auto max-w-7xl">
            <Breadcrumb pageName="Visuel de mon equipe" />
            <ReturnHeader
                headerName="Mon equipe"
                returnBtnLabel="Retour"
                returnLink="/backoffice"
            />
            <div>
                {/* users={data} */}
                <UserTable  />
            </div>
        </div>
    );
}

export default TeamsViewModule