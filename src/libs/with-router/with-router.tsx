import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const withRouter = (Component: any) => (props: any) => {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  return <Component {...props} {...{ location, params, navigate }} />
}
