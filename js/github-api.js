/* ========================================
   GITHUB API INTEGRATION
   Fetches live data from GitHub
   ======================================== */

class GitHubAPI {
    constructor(username) {
        this.username = username;
        this.baseURL = 'https://api.github.com';
        this.cache = {
            user: null,
            repos: null,
            timestamp: null
        };
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    }

    // Check if cache is valid
    isCacheValid() {
        if (!this.cache.timestamp) return false;
        return (Date.now() - this.cache.timestamp) < this.cacheExpiry;
    }

    // Fetch user profile data
    async getUserProfile() {
        if (this.cache.user && this.isCacheValid()) {
            return this.cache.user;
        }

        try {
            const response = await fetch(`${this.baseURL}/users/${this.username}`);
            if (!response.ok) throw new Error('Failed to fetch user profile');
            
            const data = await response.json();
            this.cache.user = data;
            this.cache.timestamp = Date.now();
            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

    // Fetch repositories
    async getRepositories(sort = 'updated', limit = 100) {
        if (this.cache.repos && this.isCacheValid()) {
            return this.cache.repos;
        }

        try {
            const response = await fetch(
                `${this.baseURL}/users/${this.username}/repos?sort=${sort}&per_page=${limit}`
            );
            if (!response.ok) throw new Error('Failed to fetch repositories');
            
            const data = await response.json();
            this.cache.repos = data;
            this.cache.timestamp = Date.now();
            return data;
        } catch (error) {
            console.error('Error fetching repositories:', error);
            return [];
        }
    }

    // Get featured repositories (by stars or specific names)
    async getFeaturedRepos(featuredNames = []) {
        const repos = await this.getRepositories();
        
        if (featuredNames.length > 0) {
            return repos.filter(repo => 
                featuredNames.includes(repo.name)
            );
        }
        
        // Return top repos by stars
        return repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
    }

    // Get GitHub stats
    async getStats() {
        const [user, repos] = await Promise.all([
            this.getUserProfile(),
            this.getRepositories()
        ]);

        if (!user || !repos) return null;

        const publicRepos = repos.filter(repo => !repo.fork);
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        
        // Get languages
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const topLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang]) => lang);

        return {
            publicRepos: publicRepos.length,
            totalRepos: user.public_repos,
            followers: user.followers,
            following: user.following,
            totalStars,
            totalForks,
            topLanguages,
            bio: user.bio,
            location: user.location,
            blog: user.blog,
            company: user.company,
            createdAt: user.created_at
        };
    }

    // Format repository data for display
    formatRepo(repo) {
        return {
            name: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
            updatedAt: new Date(repo.updated_at).toLocaleDateString(),
            createdAt: new Date(repo.created_at).toLocaleDateString()
        };
    }

    // Search repositories by keyword
    async searchRepos(keyword) {
        const repos = await this.getRepositories();
        const lowerKeyword = keyword.toLowerCase();
        
        return repos.filter(repo => 
            repo.name.toLowerCase().includes(lowerKeyword) ||
            (repo.description && repo.description.toLowerCase().includes(lowerKeyword)) ||
            (repo.topics && repo.topics.some(topic => topic.includes(lowerKeyword)))
        ).map(repo => this.formatRepo(repo));
    }

    // Get repository by name
    async getRepoByName(repoName) {
        const repos = await this.getRepositories();
        const repo = repos.find(r => r.name.toLowerCase() === repoName.toLowerCase());
        return repo ? this.formatRepo(repo) : null;
    }
}

// Initialize GitHub API
const githubAPI = new GitHubAPI('NoctuaCoder');

// Export for use in other scripts
window.githubAPI = githubAPI;
