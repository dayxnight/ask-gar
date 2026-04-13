-- Create profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table for Q&A submissions
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for questions
CREATE POLICY "questions_select_own_or_public" ON questions FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);
CREATE POLICY "questions_insert_own" ON questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "questions_update_own" ON questions FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for shares
CREATE POLICY "shares_select" ON shares FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM questions WHERE questions.id = shares.question_id AND (questions.is_public = TRUE OR auth.uid() = questions.user_id)
  )
);
CREATE POLICY "shares_insert" ON shares FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM questions WHERE questions.id = question_id AND (is_public = TRUE OR auth.uid() = user_id)
  )
);
