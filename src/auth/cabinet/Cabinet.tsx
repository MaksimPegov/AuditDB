export const Cabinet: React.FC = () => {
  const user = { name: 'test', email: 'test@email.com' }

  return (
    <div>
      <h1>Cabinet</h1>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
    </div>
  )
}
