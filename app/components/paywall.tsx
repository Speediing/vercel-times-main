import type { ReactNode } from 'react'
import { PaywallForm } from './paywall-form'

export const Paywall = ({ children }: { children: ReactNode }) => (
  <>
    <div className="fixed overflow-hidden h-full w-full">
      {children}
      <div className="bg-[linear-gradient(transparent,#000)] absolute top-[40px] w-full h-full pointer-events-none"></div>
    </div>
    <div
      className="min-h-[50vh] py-5 px-6 bg-white absolute top-[100vh] translate-y-[-50vh] w-full border-t border-[#333]"
      aria-live="polite"
      role="main"
    >
      <div className="grid items-center justify-center max-w-md mt-4 mx-auto">
        <div className="mb-8">
          <PaywallForm>
            <div className="text-center text-[1.375rem] leading-[1.625rem] tracking-[-0.1px]">
              <h2 className="font-bold">Thanks for reading Vercel Times.</h2>
              <h2 className="text-[#333]">
                Create your free account or log in to continue reading.
              </h2>
            </div>
            <label className="flex flex-col mt-4 text-sm">
              <span className="text-sm font-semibold leading-[1.3125rem]">
                Email address
              </span>
              <input
                type="email"
                name="email"
                className="h-11 px-3 mt-1 border border-[#888] focus:border-black rounded-[3px] outline-none"
                maxLength={64}
                autoCapitalize="off"
                autoComplete="username"
              />
            </label>
            <button
              type="submit"
              className="h-11 mt-4 font-bold text-white bg-[#121212] w-full hover:bg-[#333] hover:border-[#333] border border-black rounded-[3px] transition-colors"
            >
              Continue
            </button>
            <p className="text-center mt-3 text-sm leading-[1.3125rem]">
              No emails are saved, we'll just set a cookie that removes the
              paywall.
            </p>
          </PaywallForm>
        </div>
        <div className="text-center mb-[4.375rem]">
          <p>Support independent journalism.</p>
          <a
            href="https://www.nytimes.com/subscription.html"
            className="text-[#333] font-bold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            See subscription options
          </a>
        </div>
      </div>
    </div>
  </>
)
