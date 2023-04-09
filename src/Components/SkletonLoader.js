import React from 'react'

const SkletonLoader = () => {
    return (
        <div class="border border-blue-300 shadow rounded-md p-4 w-[16rem] h-[18rem] mx-auto">
            <div class="animate-pulse">
                <div class="bg-slate-200 h-[14.5rem] w-[14rem]"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-4 bg-slate-200 rounded"></div>
                   
                </div>
            </div>
        </div>
    )
}

export default SkletonLoader