import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/emre')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/emre"!</div>
}
