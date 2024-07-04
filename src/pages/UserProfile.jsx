import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async () => {
  // Replace with actual API call
  return {
    name: "John Doe",
    bio: "Tech enthusiast and software developer.",
    avatarUrl: "https://via.placeholder.com/150",
    posts: [
      { id: 1, title: "Latest in AI" },
      { id: 2, title: "New JavaScript Frameworks" },
    ],
  };
};

const UserProfile = () => {
  const { data: user, error, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">{user.name}</h1>
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src={user.avatarUrl} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <p className="mb-6">{user.bio}</p>
      <h2 className="text-2xl mb-4">Posts</h2>
      {user.posts.map((post) => (
        <Card key={post.id} className="w-full max-w-2xl mb-4">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default UserProfile;