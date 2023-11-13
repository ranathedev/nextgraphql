import React from 'react'
import Link from 'next/link'

interface Props {
  repo: {
    name: string
    description: string
    url: string
    viewerSubscription: string
    licenseInfo: { spdxId: string; url: string }
  }
}

const RepoInfo = ({ repo }: Props) => {
  return (
    <li className="flex gap-6 justify-between border-b border-gray-300 pb-2 px-2">
      <div>
        <Link
          href={repo.url}
          target="_blank"
          className="text-blue-600 font-semibold text-2xl hover:underline"
        >
          {repo.name}
        </Link>
        <p className="mt-2">{repo.description}</p>
      </div>
      <div className="flex flex-col gap-2 roboto">
        <div className="p-1.5 bg-green-500 text-white rounded-md text-sm">
          {repo.viewerSubscription}
        </div>
        {repo.licenseInfo.spdxId && (
          <Link
            href={repo.licenseInfo.url}
            target="_blank"
            className={`py-1 px-1.5 ${
              repo.licenseInfo.spdxId === 'NOASSERTION'
                ? 'bg-blue--500 text-white'
                : 'bg-none border border-blue-500 text-blue-500'
            } rounded-md text-sm text-center hover:underline`}
          >
            {repo.licenseInfo.spdxId}
          </Link>
        )}
      </div>
    </li>
  )
}

export default RepoInfo
