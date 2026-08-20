"use client";

/**
 * Thin "use client" wrappers around MUI components rendered as next/link.
 *
 * Server Components can't pass a function (like the `Link` component
 * itself) as a prop into a Client Component — only serializable values.
 * `component={Link}` therefore breaks whenever it's written directly inside
 * a Server Component page. These wrappers resolve `Link` inside the client
 * boundary instead, so pages only ever pass a plain `href` string down.
 */

import Link from "next/link";
import Button, { type ButtonProps } from "@mui/material/Button";
import Card, { type CardProps } from "@mui/material/Card";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";

type WithHref<T> = T & { href: string };

export function ButtonLink({ href, ...props }: WithHref<ButtonProps>) {
  return <Button component={Link} href={href} {...props} />;
}

export function CardLink({ href, ...props }: WithHref<CardProps>) {
  return <Card component={Link} href={href} {...props} />;
}

export function TextLink({ href, ...props }: WithHref<TypographyProps>) {
  return <Typography component={Link} href={href} {...props} />;
}

export function ListItemButtonLink({ href, ...props }: WithHref<ListItemButtonProps>) {
  return <ListItemButton component={Link} href={href} {...props} />;
}
