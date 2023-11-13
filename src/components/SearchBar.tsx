import React from 'react'

interface Props {
  pageCount: number
  queryString: string
  totalCount: number
  setQueryString: (arg: string) => void
  setPageCount: (arg: number) => void
}

const SearchBar = ({
  pageCount,
  queryString,
  totalCount,
  setQueryString,
  setPageCount,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-gray-200 p-4 mt-8 rounded-md">
      <div className="flex items-center gap-4 flex-1">
        <b>Search</b>
        <input
          value={queryString}
          onChange={e => setQueryString(e.target.value)}
          placeholder="Search words in the repositories..."
          className="w-full p-1 rounded-md outline-none"
        />
      </div>
      <div className="flex gap-4 justify-end">
        <div className="flex items-center gap-4 w-max">
          <b>Show</b>
          <input
            type="number"
            value={pageCount}
            min={1}
            max={100}
            onChange={e => setPageCount(Number(e.target.value))}
            step={1}
            placeholder="search words in the repositories..."
            className="w-full max-w-[60px] p-1 px-1.5 rounded-md"
          />
        </div>
        <div className="flex items-center gap-4 w-max">
          <b>Total : </b>
          {totalCount}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
