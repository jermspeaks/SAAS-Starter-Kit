import Image from "next/image"
import Link from "next/link"
import { allPosts } from "./../../../../generated/index.mjs"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="py-6 lg:py-10 max-w-4xl container">
      <div className="flex md:flex-row flex-col md:justify-between items-start gap-4 md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl lg:text-5xl tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground text-xl">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="gap-10 grid sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="relative flex flex-col space-y-2 group"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="bg-muted border rounded-md transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="font-extrabold text-2xl">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(post.date)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
