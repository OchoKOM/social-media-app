import { LinkIt, LinkItUrl } from "react-linkify-it";
import React from "react";
import Link from "next/link";
import UserLinkWithTooltip from "./UserLinkWithTooltip";

interface LinkifyProps {
  children: React.ReactNode;
}

export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyHashtag>
      <LinkifyUsername>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyUsername>
    </LinkifyHashtag>
  );
}

function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
}

function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(?<!https?:\/\/\S*)@([a-zA-Z0-9_-]+)/}
      component={(match, key) => {
        return (
          <UserLinkWithTooltip key={key} username={match.slice(1)}>
            {match}
          </UserLinkWithTooltip>
        );
      }}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(?<!https?:\/\/\S*)#([a-zA-Z0-9_-]+)/}
      component={(match, key) => {
        return (
          <Link
            key={key}
            href={`/hashtag/${match.slice(1)}`}
            className="text-primary hover:underline"
          >
            {match}
          </Link>
        );
      }}
    >
      {children}
    </LinkIt>
  );
}
