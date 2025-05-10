import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/user-form/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'dashboard/task-form/:id',
    renderMode: RenderMode.Client
  }
];
