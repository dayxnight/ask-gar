-- Create users table for authentication and profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table for Q&A submissions
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  is_answered BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  answered_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shares table to track question sharing
CREATE TABLE IF NOT EXISTS shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  share_platform VARCHAR(50),
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_user_id ON questions(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_is_answered ON questions(is_answered);
CREATE INDEX IF NOT EXISTS idx_questions_is_public ON questions(is_public);
CREATE INDEX IF NOT EXISTS idx_shares_question_id ON shares(question_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own data
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT USING (auth.uid() = id);

-- RLS Policy: Users can view their own questions
CREATE POLICY "Users can view their own questions"
  ON questions FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

-- RLS Policy: Users can create questions
CREATE POLICY "Users can create questions"
  ON questions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own questions
CREATE POLICY "Users can update their own questions"
  ON questions FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policy: Users can view shares for public questions
CREATE POLICY "Users can view shares"
  ON shares FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM questions WHERE questions.id = shares.question_id AND (questions.is_public = TRUE OR auth.uid() = questions.user_id)
    )
  );

-- RLS Policy: Users can create shares
CREATE POLICY "Users can create shares"
  ON shares FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM questions WHERE questions.id = question_id AND (is_public = TRUE OR auth.uid() = user_id)
    )
  );
