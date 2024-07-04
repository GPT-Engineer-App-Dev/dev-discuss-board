import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

const fetchDiscussion = async () => {
  // Replace with actual API call
  return {
    id: 1,
    title: "Latest in AI",
    content: "Discussion about AI advancements",
    replies: [
      { id: 1, user: "Alice", content: "AI is fascinating!", timestamp: "2023-10-01" },
      { id: 2, user: "Bob", content: "I agree, it's the future.", timestamp: "2023-10-02" },
    ],
  };
};

const Discussion = () => {
  const { data: discussion, error, isLoading } = useQuery({
    queryKey: ["discussion"],
    queryFn: fetchDiscussion,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading discussion</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">{discussion.title}</h1>
      <Card className="w-full max-w-2xl mb-6">
        <CardContent>
          <p>{discussion.content}</p>
        </CardContent>
      </Card>
      <h2 className="text-2xl mb-4">Replies</h2>
      {discussion.replies.map((reply) => (
        <Card key={reply.id} className="w-full max-w-2xl mb-4">
          <CardHeader>
            <CardTitle>{reply.user}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{reply.content}</p>
            <p className="text-sm text-muted-foreground">{reply.timestamp}</p>
          </CardContent>
        </Card>
      ))}
      <Input placeholder="Add a reply..." className="w-full max-w-2xl mt-6" />
    </div>
  );
};

export default Discussion;