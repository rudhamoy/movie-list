import React from 'react'

const MovieInfoLoader = () => {
  return (
    <div className="border bg-gray-50 border-blue-300 shadow p-2 rounded-md w-[40rem] z-50 relative mx-auto">
            <div className="animate-pulse flex gap-x-5">
                <div className="bg-slate-200 h-[24rem] w-[16rem] overflow-hidden rounded-md"></div>
                <div className="space-y-6 py-1">
                    <div className="h-8 bg-slate-200 rounded w-[14rem]"></div>
                    <div className="h-5 bg-slate-200 rounded w-[8rem]"></div>
                    <div className="h-5 bg-slate-200 rounded w-[8rem]"></div>
                    <div className="h-5 bg-slate-200 rounded w-[8rem]"></div>
                    <div className="h-5 bg-slate-200 rounded w-[8rem]"></div>
                    <div className="h-20 bg-slate-200 rounded w-[16rem]"></div>
                </div>
            </div>
        </div>
  )
}

export default MovieInfoLoader