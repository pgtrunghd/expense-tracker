"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function VaulDrawer() {
  return (
    <Drawer shouldScaleBackground={true}>
      <DrawerTrigger className="">Open Drawer</DrawerTrigger>
      <>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md overflow-auto rounded-t-[10px] p-4">
            <DrawerTitle className="mt-8 font-medium text-gray-900">
              New Project
            </DrawerTitle>
            <DrawerDescription className="mt-2 leading-6 text-gray-600">
              Get started by filling in the information below to create your new
              project.
            </DrawerDescription>
            <label
              htmlFor="name"
              className="mb-2 mt-8 block text-sm font-medium text-gray-900"
            >
              Project name
            </label>
            <input
              id="name"
              className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-gray-900 outline-none focus:ring-2 focus:ring-black/5"
            />
            <label
              htmlFor="name"
              className="mb-2 mt-8 block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              rows={6}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5 focus:ring-offset-0"
            />
            <button className="mt-4 h-[44px] w-full rounded-lg bg-black font-medium text-gray-50">
              Submit
            </button>
          </div>
        </DrawerContent>
      </>
    </Drawer>
  );
}
