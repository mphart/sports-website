

export function PageHeader({children}){
    return(<h1 className="text-3xl font-bold pt-7 pb-7">{children}</h1>)
}

export function MainPageSection({children}){
    return(
        <div className="bg-gray-200 min-w-[500px]">
            <div className="ml-30 mr-30 pl-5 pr-5 pb-10 bg-gray-100 min-h-[300px]">
                {children}
            </div>
        </div>
    )
}