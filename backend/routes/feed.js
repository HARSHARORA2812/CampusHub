import express from 'express';
import Event from '../models/Event.js';
import Opportunity from '../models/Opportunity.js';
import Post from '../models/Post.js';
import MarketplaceItem from '../models/MarketplaceItem.js';
import User from '../models/User.js';
import Club from '../models/Club.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Helper function to add creator email to items
async function addCreatorEmails(items, creatorIdField, creatorTypeField = null) {
  const enrichedItems = await Promise.all(items.map(async (item) => {
    const itemObj = item.toJSON();
    
    try {
      if (creatorTypeField && itemObj[creatorTypeField] === 'club') {
        // If organizer is a club, get the club leader's email
        const club = await Club.findOne({ id: itemObj[creatorIdField] });
        if (club && club.leader_ids && club.leader_ids.length > 0) {
          const clubLeader = await User.findOne({ id: club.leader_ids[0] });
          itemObj.creator_email = clubLeader?.email || null;
          itemObj.organizer_email = clubLeader?.email || null;
        }
      } else {
        // Get user's email directly
        const user = await User.findOne({ id: itemObj[creatorIdField] });
        itemObj.creator_email = user?.email || null;
        itemObj.organizer_email = user?.email || null;
        itemObj.author_email = user?.email || null;
        itemObj.posted_by_email = user?.email || null;
        itemObj.seller_email = user?.email || null;
      }
    } catch (error) {
      console.error('Error adding creator email:', error);
    }
    
    return itemObj;
  }));
  
  return enrichedItems;
}

// Get personalized feed
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('📰 Feed requested by:', req.user.email);
    
    // Get upcoming events
    const events = await Event.find({ status: 'upcoming' })
      .sort({ date: 1 })
      .limit(5);
    const enrichedEvents = await addCreatorEmails(events, 'organizer_id', 'organizer_type');
    console.log('📅 Enriched events:', enrichedEvents.map(e => ({ title: e.title, email: e.organizer_email })));

    // Get latest opportunities
    const opportunities = await Opportunity.find({ status: 'open' })
      .sort({ created_at: -1 })
      .limit(5);
    const enrichedOpportunities = await addCreatorEmails(opportunities, 'posted_by');

    // Get posts from joined clubs
    let posts = [];
    if (req.user.joined_clubs && req.user.joined_clubs.length > 0) {
      posts = await Post.find({ club_id: { $in: req.user.joined_clubs } })
        .sort({ created_at: -1 })
        .limit(10);
    }
    const enrichedPosts = await addCreatorEmails(posts, 'author_id');

    // Get marketplace items
    const marketplace = await MarketplaceItem.find({ status: 'available' })
      .sort({ created_at: -1 })
      .limit(5);
    const enrichedMarketplace = await addCreatorEmails(marketplace, 'seller_id');

    const feedData = {
      events: enrichedEvents,
      opportunities: enrichedOpportunities,
      posts: enrichedPosts,
      marketplace: enrichedMarketplace,
      announcements: [] // Add empty announcements array
    };

    res.json(feedData);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ detail: 'Failed to fetch feed' });
  }
});

// Get public feed (for non-authenticated users)
router.get('/public', async (req, res) => {
  try {
    // Get upcoming events
    const events = await Event.find({ status: 'upcoming' })
      .sort({ date: 1 })
      .limit(5);

    // Get latest opportunities
    const opportunities = await Opportunity.find({ status: 'open' })
      .sort({ created_at: -1 })
      .limit(5);

    // Get recent posts from all clubs
    const posts = await Post.find({})
      .sort({ created_at: -1 })
      .limit(10);

    // Get marketplace items
    const marketplace = await MarketplaceItem.find({ status: 'available' })
      .sort({ created_at: -1 })
      .limit(5);

    const feedData = {
      events: events.map(event => event.toJSON()),
      opportunities: opportunities.map(opp => opp.toJSON()),
      posts: posts.map(post => post.toJSON()),
      marketplace: marketplace.map(item => item.toJSON())
    };

    res.json(feedData);
  } catch (error) {
    console.error('Get public feed error:', error);
    res.status(500).json({ detail: 'Failed to fetch public feed' });
  }
});

export default router;
