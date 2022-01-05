import React from "react";

export type ReactComponentProps<T> = T extends React.Component<infer P>
    ? P
    : (T extends React.FunctionComponent<infer P> ? P : never);

export type Result<T, E> = { type: "ok", value: T } | { type: "err", value: E };

export function Ok<T, E>(value: T): Result<T, E> {
    return { type: "ok", value };
}

export function Err<T, E>(value: E): Result<T, E> {
    return { type: "err", value };
}
