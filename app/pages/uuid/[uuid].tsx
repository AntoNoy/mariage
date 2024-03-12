import { login } from '@/services/auth';
import { Box, CircularProgress } from '@mui/material';
import { NextPageContext } from 'next';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies';
import { useContext, useEffect } from 'react';

export default function Page() {
    const router = useRouter()


    useEffect(() => {
        test()

    }, [router.query.uuid])

    async function test() {
        console.log('uuid', router?.query?.uuid)
        if (router?.query.uuid) {

            login({
                uuid: router.query.uuid as string,
            }).then((res: any) => {
                console.log(res)
                router.replace('/home')
            })
        }
    }

    return (
        <Box sx={{ display: 'flex'}}>
            <CircularProgress />
        </Box>
    )
}



