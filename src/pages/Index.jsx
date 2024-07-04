import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

const fetchRecentDiscussions = async () => {
  // Replace with actual API call
  return [
    { id: 1, title: "Latest in AI", description: "Discussion about AI advancements" },
    { id: 2, title: "New JavaScript Frameworks", description: "What's new in JS frameworks?" },
  ];
};

const Index = () => {
  const { data: discussions, error, isLoading } = useQuery({
    queryKey: ["recentDiscussions"],
    queryFn: fetchRecentDiscussions,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading discussions</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">Welcome to Tech Forum</h1>
      <p className="mb-6">A place to discuss the latest in technology.</p>
      <div className="w-full max-w-2xl">
        <Input placeholder="Search discussions..." className="mb-6" />
        <h2 className="text-2xl mb-4">Recent Discussions</h2>
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="mb-4">
            <CardHeader>
              <CardTitle>{discussion.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{discussion.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;