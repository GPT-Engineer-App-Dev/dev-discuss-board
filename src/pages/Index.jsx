import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const fetchRecentDiscussions = async () => {
  // Replace with actual API call
  return [
    { id: 1, title: "Latest in AI", description: "Discussion about AI advancements" },
    { id: 2, title: "New JavaScript Frameworks", description: "What's new in JS frameworks?" },
  ];
};

const createPost = async (newPost) => {
  // Replace with actual API call
  return { id: Math.random(), ...newPost };
};

const Index = () => {
  const queryClient = useQueryClient();
  const { data: discussions, error, isLoading } = useQuery({
    queryKey: ["recentDiscussions"],
    queryFn: fetchRecentDiscussions,
  });

  const mutation = useMutation(createPost, {
    onSuccess: (newPost) => {
      queryClient.setQueryData(["recentDiscussions"], (old) => [...old, newPost]);
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, description: content });
    setTitle("");
    setContent("");
  };

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-6">Create New Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Post Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Creating..." : "Create Post"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;