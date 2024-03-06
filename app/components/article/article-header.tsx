import Link from 'next/link'
import { Logo } from '../logo'

export const ArticleHeader = () => (
  <header className="fixed bg-white z-10 w-full border-b border-[#e2e2e2]">
    <section className="max-w-[1605px] h-[42px] flex justify-around items-center relative my-0 mx-auto pt-1 pb-0.5 px-4">
      <div className="flex absolute left-2.5">
        <ul className="flex flex-0 flex-row space-x-4 items-center">
          <li className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-neutral-200 pointer">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <rect x="1" y="3" fill="#333" width="14" height="2"></rect>
              <rect x="1" y="7" fill="#333" width="14" height="2"></rect>
              <rect x="1" y="11" fill="#333" width="14" height="2"></rect>
            </svg>
          </li>
          <li className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-neutral-200 pointer">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path
                fill="#333"
                d="M11.3,9.2C11.7,8.4,12,7.5,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1,0,1.9-0.3,2.7-0.7l3.3,3.3c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L11.3,9.2zM6.5,10.3c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C10.3,8.6,8.6,10.3,6.5,10.3z"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
      <div>
        <Link href="/" className="block text-center">
          <Logo height={26} width={195} />
        </Link>
      </div>
    </section>
  </header>
)
