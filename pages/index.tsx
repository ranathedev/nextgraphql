import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'

import query from '@/src/query'
import RepoIcon from 'assets/RepoIcon'
import RepoInfo from 'components/RepoInfo'
import SearchBar from 'components/SearchBar'
import PaginationBtns from 'components/PaginationBtns'

export default function Home() {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [repoList, setRepoList] = useState([])
  const [pageCount, setPageCount] = useState(10)
  const [queryString, setQueryString] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [startCursor, setStartCursor] = useState('')
  const [endCursor, setEndCursor] = useState('')
  const [hasPrevPg, setHasPrevPg] = useState(false)
  const [hasNextPg, setHasNextPg] = useState(false)
  const [paginationKeyword, setPaginationKeyword] = useState('first')
  const [paginationString, setPaginationString] = useState('')

  const fetchData = async () => {
    const queryText = query(
      pageCount,
      queryString,
      paginationKeyword,
      paginationString
    )

    const res = await axios.post(
      'https://proxar.ranaintizar.com/api/github',
      queryText,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    )

    const { name, avatarUrl, url } = res.data.user
    const {
      edges: repos,
      repositoryCount: total,
      pageInfo: { startCursor, endCursor, hasPreviousPage, hasNextPage },
    } = res.data.search

    setName(name)
    setImgUrl(avatarUrl)
    setUrl(url)
    setRepoList(repos)
    setTotalCount(total)
    setStartCursor(startCursor)
    setEndCursor(endCursor)
    setHasPrevPg(hasPreviousPage)
    setHasNextPg(hasNextPage)
  }

  useEffect(() => {
    fetchData()
  }, [pageCount, queryString, paginationKeyword, paginationString])

  interface Repo {
    node: {
      name: string
      description: string
      id: string
      url: string
      viewerSubscription: string
      licenseInfo: { spdxId: string; url: string }
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>Next GraphQL</title>
      </Head>
      <main className="relative flex flex-col items-center w-screen min-h-screen px-4">
        <div className="w-full max-w-7xl pb-16">
          <div className="flex justify-center items-center gap-4 mt-16">
            <RepoIcon width={44} height={44} color="#2563eb" />
            <h1 className="text-6xl text-blue-600 font-semibold tracking-tight">
              Repos
            </h1>
          </div>
          <div className="flex justify-between mt-16">
            <div className="flex gap-2 text-3xl">
              <h2 className="">Hey there,</h2>
              <Link
                href={url}
                target="_blank"
                className="text-blue-600 font-semibold"
              >
                {name}.
              </Link>
            </div>
            <div>
              {imgUrl !== '' && (
                <Image
                  src={imgUrl}
                  width={50}
                  height={50}
                  alt="user-avatar"
                  className="border border-gray-400 rounded-full"
                />
              )}
            </div>
          </div>
          <SearchBar
            pageCount={pageCount}
            queryString={queryString}
            totalCount={totalCount}
            setQueryString={setQueryString}
            setPageCount={setPageCount}
          />
          <PaginationBtns
            start={startCursor}
            end={endCursor}
            prev={hasPrevPg}
            next={hasNextPg}
            onClick={(keyword, string) => {
              setPaginationKeyword(keyword)
              setPaginationString(string)
            }}
          />
          {(repoList.length > 0 && (
            <ul className="flex flex-col gap-4 mt-10">
              {repoList.map((data: Repo) => (
                <RepoInfo key={data.node.id} repo={data.node} />
              ))}
            </ul>
          )) || <p>No repositories found.</p>}
        </div>
      </main>
    </>
  )
}
