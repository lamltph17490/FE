import React, { ReactElement } from "react";

interface BreadcrumbProps {
  title: string
  description: string
  button?: ReactElement
}

export default function AppBreadcrumb(props: BreadcrumbProps) {
  return (
    <header className="z-10 fixed top-0 eft-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
      <div className="flex items-center text-sm text-gray-600">
        <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
          {props.title}
        </h5>
        <span>{props.description}</span>
      </div>
      {props.button}
    </header>
  )
}
