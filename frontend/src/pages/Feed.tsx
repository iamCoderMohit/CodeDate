import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useInfo } from "../hooks/useInfo"
import FeedLoader from "../components/FeedLoader"
import UserCard from "../components/UserCard"

function Feed() {
    const {getAll, users, loading} = useInfo()
    useEffect(() => {
        async function fetchUsers() {
            await getAll()
        }
        fetchUsers()
    }, [])

  return (
    <div>
        <Navbar />
        {loading ? <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FeedLoader />
        </div> : <div className="flex flex-wrap justify-around">
            {users.map((user: any) => (
                <UserCard username={user.username} intrests={user.interests} name={user.name} />
            ))}
        </div> }
    </div>
  )
}

export default Feed