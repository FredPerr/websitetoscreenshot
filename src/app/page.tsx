'use client'

import React from 'react'
import Form from './form'

export default function Home() {
    return (
        <Form onSubmit={(data) => {
            console.table(data)
        }} />
    )
}
