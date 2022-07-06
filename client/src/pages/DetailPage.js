import React, { useState, useCallback, useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext';
import { LinkCard  } from '../components/LinkCard';

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback( async () => {
        try {
            const fetch = await request(`/api/links/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setLink(fetch)
        } catch (e) {}
    }, [token, request, linkId])

    useEffect( () => {
        getLink()
    }, [getLink])
    return (
        <div>
            <LinkCard link={link}/>
        </div>
    )
}