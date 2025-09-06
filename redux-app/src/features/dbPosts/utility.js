import { generatePath, matchPath, useLocation, useParams } from "react-router-dom";

const routeTemplates = [
  '/users/:userId',
  '/products/:productId',
];

export function ReplaceUserLink({ newUserId }) {
  const location = useLocation();
  const params = useParams();

  // Find which route pattern matches the current path
  const matchedTemplate = routeTemplates.find(template =>
    matchPath({ path: template, end: true }, location.pathname)
  );

  // Generate the new path with the updated parameter
  const newPath = generatePath(matchedTemplate, {
    ...params,
    userId: newUserId
  });

 return newPath
}