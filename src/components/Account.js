
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-shadcn"
import { User } from "lucide-react"

const Account = ({ session }) => {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const { toast } = useToast()

    useEffect(() => {
        if (session) {
            getProfile()
        }
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const user = session?.user
            
            if (!user) {
                console.error("No user on the session!")
                return
            }

            console.log("Getting profile for user:", user.id)

            // First check if user has metadata
            if (user.user_metadata) {
                setUsername(user.user_metadata.username || user.user_metadata.name || user.email)
                setWebsite(user.user_metadata.website || "")
                setAvatarUrl(user.user_metadata.avatar_url || "")
                console.log("Using user metadata:", user.user_metadata)
            }

            // Try to get from profiles table if it exists
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url`)
                    .eq('id', user.id)
                    .single()

                if (data && !error) {
                    console.log("Found profile in profiles table:", data)
                    setUsername(data.username || username)
                    setWebsite(data.website || website)
                    setAvatarUrl(data.avatar_url || avatar_url)
                } else if (error && error.code !== "PGRST116") {
                    console.log("Error fetching profile:", error)
                }
            } catch (err) {
                console.log("Error accessing profiles table:", err)
                // Table probably doesn't exist, that's okay
            }
        } catch (error) {
            console.error("Error loading user profile:", error)
            toast({
                title: "Error loading profile",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const user = session?.user

            if (!user) {
                throw new Error("No user on the session")
            }

            // First update user metadata
            const { error: metadataError } = await supabase.auth.updateUser({
                data: { username, website }
            })

            if (metadataError) {
                console.error("Error updating user metadata:", metadataError)
            } else {
                console.log("Updated user metadata")
            }

            // Try to update profiles table if it exists
            try {
                const updates = {
                    id: user.id,
                    username,
                    website,
                    avatar_url,
                    updated_at: new Date()
                }

                let { error } = await supabase.from("profiles")
                    .upsert(updates, { returning: 'minimal' })

                if (error) {
                    console.error("Error updating profiles table:", error)
                } else {
                    console.log("Updated profiles table")
                }
            } catch (err) {
                console.log("Error accessing profiles table:", err)
                // Table probably doesn't exist, that's okay
            }

            toast({
                title: "Success",
                description: "Profile updated successfully!"
            })
        } catch (error) {
            toast({
                title: "Error updating profile",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
            toast({
                title: "Signed out",
                description: "You have been successfully signed out."
            })
        } catch (error) {
            toast({
                title: "Error signing out",
                description: error.message,
                variant: "destructive"
            })
        }
    }

    return (
        <div aria-live="polite" className='container mx-auto'>
            {loading ? (
                <div className="text-center p-4">Loading profile...</div>
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24">
                            {avatar_url ? (
                                <AvatarImage src={avatar_url} alt="User avatar" />
                            ) : (
                                <AvatarFallback>
                                    <User size={48} />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-lg font-semibold">User ID: {session.user.id}</p>
                        <p>Email: {session.user.email}</p>
                        <p className="text-sm text-gray-500">Last Sign In: {new Date(session.user.last_sign_in_at || session.created_at).toLocaleString()}</p>
                    </div>
                    <div className="container mx-auto w-72 py-4">
                        <input type="text"
                            name="text"
                            id="username"
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="Your Name"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="container mx-auto w-72 py-4">
                        <input type="text"
                            name="text"
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="your@website.com"
                            id="website"
                            value={website || ''}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className='text-center'>
                        <button className="my-3 w-44 h-11 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                            Update Profile
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="w-44 h-11 rounded-full text-gray-50 bg-red-600 hover:bg-red-700"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Account;
