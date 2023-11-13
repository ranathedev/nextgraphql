import React from 'react'

import ArrowLeft from 'assets/ArrowLeft'
import ArrowRight from 'assets/ArrowRight'

interface Props {
  prev: boolean
  next: boolean
  start: string
  end: string
  onClick: (arg1: string, arg2: string) => void
}

const PaginationBtns = ({ prev, next, start, end, onClick }: Props) => {
  return (
    <div className="flex gap-4 items-center justify-center mt-8">
      {prev && (
        <button
          title="previous page"
          className="flex items-center gap-2 text-white bg-blue-500 py-2 px-2.5 rounded-md"
          onClick={() => {
            onClick('last', `before: "${start}"`)
          }}
        >
          <ArrowLeft /> Prev Page
        </button>
      )}
      {next && (
        <button
          title="next page"
          className="flex items-center gap-2 text-white bg-blue-500 py-2 px-2.5 rounded-md"
          onClick={() => {
            onClick('first', `after: "${end}"`)
          }}
        >
          Next Page
          <ArrowRight />
        </button>
      )}
    </div>
  )
}

export default PaginationBtns
