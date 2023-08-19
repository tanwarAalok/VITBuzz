import { useRouter } from 'next/router'
import React, {Fragment, useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import Loader from "@/components/Loading";

export default function ProtectedRoute({ children, session, status }) {
    const router = useRouter();
    const loading = status === "loading";
    const unauthenticated = status === 'unauthenticated';
    const authenticated = status === 'authenticated';

    useEffect(() => {
        if(loading || !router.isReady || !session) return;
        if(unauthenticated || session.user.email !== process.env.NEXT_PUBLIC_ADMIN) {
            router.push({
                pathname: '/',
                query: { returnUrl: router.asPath },
            });
        }
    }, [router, status, loading, unauthenticated, session]);

    if(loading || !router){
        return <Loader/>
    }

    if(authenticated){
        return <Fragment>{children}</Fragment>
    }
    else return router.push("/");

}
