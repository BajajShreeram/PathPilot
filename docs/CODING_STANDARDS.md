# PathPilot - Coding Standards

Comprehensive coding standards and best practices for PathPilot development.

---

## General Principles

1. **Write Clean Code**: Code should be self-documenting
2. **Keep It Simple**: Avoid over-engineering
3. **Be Consistent**: Follow established patterns
4. **Think Modular**: Write reusable, testable code
5. **Document Complex Logic**: Add comments where necessary

---

## Naming Conventions

### Frontend (TypeScript/React)

#### Files and Folders

```
✅ Good:
- PascalCase for components: Button.tsx, UserCard.tsx
- camelCase for utilities: formatDate.ts, apiClient.ts
- kebab-case for pages: home-page.tsx (optional)
- lowercase for folders: components/, hooks/, utils/

❌ Bad:
- button.tsx (component should be PascalCase)
- FormatDate.ts (utility should be camelCase)
- User_Card.tsx (no underscores)
```

#### Variables and Functions

```typescript
// ✅ Good
const userName = 'John';
const isAuthenticated = true;
const fetchUserData = async () => {};
const handleSubmit = () => {};

// ❌ Bad
const UserName = 'John';  // Should be camelCase
const is_authenticated = true;  // No underscores
const FetchUserData = async () => {};  // Should be camelCase
```

#### React Components

```typescript
// ✅ Good - PascalCase for components
const UserProfile = () => {
  return <div>Profile</div>;
};

// ✅ Good - Component props interface
interface UserCardProps {
  name: string;
  age: number;
}

const UserCard: React.FC<UserCardProps> = ({ name, age }) => {
  return <div>{name}, {age}</div>;
};

// ❌ Bad
const userProfile = () => {};  // Should be PascalCase
const User_Card = () => {};     // No underscores
```

#### Constants

```typescript
// ✅ Good - UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.pathpilot.com';
const MAX_RETRY_ATTEMPTS = 3;

// ❌ Bad
const apiBaseUrl = 'https://api.pathpilot.com';  // Should be UPPER_SNAKE_CASE
```

### Backend (Python/FastAPI)

#### Files and Folders

```
✅ Good:
- snake_case for files: user_service.py, auth_utils.py
- snake_case for folders: services/, models/, utils/

❌ Bad:
- UserService.py (should be snake_case)
- auth-utils.py (use underscore, not dash)
```

#### Variables and Functions

```python
# ✅ Good
user_name = "John"
is_authenticated = True

def get_user_data():
    pass

async def fetch_user_by_id(user_id: int):
    pass

# ❌ Bad
userName = "John"  # Should be snake_case
IsAuthenticated = True  # Should be snake_case

def GetUserData():  # Should be snake_case
    pass
```

#### Classes

```python
# ✅ Good - PascalCase for classes
class UserService:
    pass

class MeshAPIClient:
    pass

# ❌ Bad
class user_service:  # Should be PascalCase
    pass
```

#### Constants

```python
# ✅ Good - UPPER_SNAKE_CASE for constants
API_BASE_URL = "https://api.pathpilot.com"
MAX_RETRY_ATTEMPTS = 3

# ❌ Bad
api_base_url = "https://api.pathpilot.com"  # Should be UPPER_SNAKE_CASE
```

---

## Component Structure

### React Component Template

```typescript
import React from 'react';
import { ComponentSpecificImports } from 'library';

// 1. Type Definitions
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// 2. Component Definition
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  // 3. Hooks (if any)
  const [isLoading, setIsLoading] = React.useState(false);

  // 4. Event Handlers
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  // 5. Render
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};

// 6. Export
export default Button;
```

### Component Organization Rules

1. **One component per file** (except small sub-components)
2. **Props interface before component**
3. **Hooks at the top of the component**
4. **Event handlers before render**
5. **Export at the bottom**

---

## API Endpoint Structure

### FastAPI Endpoint Template

```python
from fastapi import APIRouter, Depends, HTTPException
from schemas.user import UserResponse, UserCreate
from services.user_service import UserService

router = APIRouter()

@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user(
    user_data: UserCreate,
    user_service: UserService = Depends(get_user_service)
):
    """
    Create a new user
    
    Args:
        user_data: User creation data
        user_service: User service dependency
        
    Returns:
        UserResponse: Created user data
        
    Raises:
        HTTPException: If user already exists
    """
    try:
        user = await user_service.create_user(user_data)
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### API Endpoint Rules

1. **Use proper HTTP methods**: GET, POST, PUT, PATCH, DELETE
2. **Define response models**: Always specify response_model
3. **Add docstrings**: Explain what the endpoint does
4. **Handle errors**: Use HTTPException for errors
5. **Use dependencies**: Inject services via Depends()

---

## TypeScript Best Practices

### Type Safety

```typescript
// ✅ Good - Explicit types
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// ❌ Bad - Using 'any'
const fetchUser = async (id: any): Promise<any> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

### Avoid Type Assertions

```typescript
// ✅ Good - Proper type checking
const element = document.getElementById('root');
if (element instanceof HTMLElement) {
  // Safe to use element
}

// ❌ Bad - Type assertion without checking
const element = document.getElementById('root') as HTMLElement;
```

### Use Type Guards

```typescript
// ✅ Good
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

if (isUser(data)) {
  console.log(data.name); // TypeScript knows data is User
}
```

---

## Python Best Practices

### Type Hints

```python
# ✅ Good - Use type hints
from typing import List, Optional

def get_users(limit: int = 10) -> List[User]:
    pass

def find_user_by_id(user_id: int) -> Optional[User]:
    pass

# ❌ Bad - No type hints
def get_users(limit=10):
    pass
```

### Async/Await

```python
# ✅ Good - Use async for I/O operations
async def fetch_user_data(user_id: int) -> User:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"/users/{user_id}")
        return User(**response.json())

# ❌ Bad - Blocking I/O
def fetch_user_data(user_id: int) -> User:
    response = requests.get(f"/users/{user_id}")
    return User(**response.json())
```

---

## Styling Guidelines

### Tailwind CSS Usage

```typescript
// ✅ Good - Semantic, organized classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-heading font-bold text-primary">Title</h2>
  <button className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">
    Click
  </button>
</div>

// ❌ Bad - Disorganized, inconsistent
<div className="p-4 flex bg-white rounded-lg items-center shadow-md justify-between">
  <h2 className="font-bold text-primary text-2xl">Title</h2>
  <button className="bg-primary px-4 text-white py-2">Click</button>
</div>
```

### Class Order Convention

1. Layout (flex, grid)
2. Spacing (p-, m-)
3. Sizing (w-, h-)
4. Typography (text-, font-)
5. Colors (bg-, text-)
6. Borders (border-, rounded-)
7. Effects (shadow-, opacity-)
8. Interactions (hover:, focus:)

---

## Error Handling

### Frontend Error Handling

```typescript
// ✅ Good
const fetchData = async () => {
  try {
    setLoading(true);
    const response = await api.get('/data');
    setData(response.data);
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred');
    }
  } finally {
    setLoading(false);
  }
};

// ❌ Bad
const fetchData = async () => {
  const response = await api.get('/data'); // No error handling
  setData(response.data);
};
```

### Backend Error Handling

```python
# ✅ Good
from fastapi import HTTPException

async def get_user(user_id: int):
    try:
        user = await user_service.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ❌ Bad
async def get_user(user_id: int):
    user = await user_service.get_by_id(user_id)
    return user  # No error handling
```

---

## Code Comments

### When to Comment

```typescript
// ✅ Good - Comment complex logic
// Calculate compound interest using the formula: A = P(1 + r/n)^(nt)
const calculateInterest = (principal: number, rate: number, years: number) => {
  const n = 12; // Monthly compounding
  return principal * Math.pow(1 + rate / n, n * years);
};

// ✅ Good - Explain why, not what
// Using debounce to prevent excessive API calls during typing
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
);

// ❌ Bad - Obvious comments
// Set name to John
const name = 'John';

// Loop through array
for (const item of items) {
  // ...
}
```

---

## File Organization

### Frontend Folder Structure

```
components/
├── common/              # Shared UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── features/            # Feature-specific components
│   ├── career/
│   │   ├── CareerCard.tsx
│   │   └── CareerFilter.tsx
│   └── roadmap/
│       ├── RoadmapTimeline.tsx
│       └── MilestoneCard.tsx
└── layouts/             # Layout components
    ├── Header.tsx
    └── Footer.tsx
```

### Backend Folder Structure

```
services/
├── __init__.py
├── user_service.py      # User-related business logic
├── career_service.py    # Career-related business logic
└── ai_service.py        # AI-related business logic

routes/
├── __init__.py
├── user_routes.py       # User endpoints
├── career_routes.py     # Career endpoints
└── ai_routes.py         # AI endpoints
```

---

## Git Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code restructuring (no feature/bug change)
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
✅ Good:
feat(auth): add email login functionality
fix(api): resolve CORS error on production
docs(readme): update setup instructions
refactor(components): extract button component

❌ Bad:
update stuff
fixed bug
changes
WIP
```

---

## Testing Guidelines

### Frontend Tests (Future)

```typescript
// ✅ Good - Descriptive test names
describe('Button Component', () => {
  it('should render with correct label', () => {
    const { getByText } = render(<Button label="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button label="Click" onClick={handleClick} />);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Backend Tests (Future)

```python
# ✅ Good - Clear test structure
def test_create_user_success():
    # Arrange
    user_data = {"name": "John", "email": "john@example.com"}
    
    # Act
    response = client.post("/users", json=user_data)
    
    # Assert
    assert response.status_code == 201
    assert response.json()["name"] == "John"

def test_create_user_duplicate_email():
    user_data = {"name": "John", "email": "existing@example.com"}
    response = client.post("/users", json=user_data)
    assert response.status_code == 400
```

---

## Performance Guidelines

### Frontend

1. **Lazy Loading**: Use React.lazy for route-based code splitting
2. **Memoization**: Use useMemo and useCallback appropriately
3. **Avoid Re-renders**: Use React.memo for expensive components
4. **Optimize Images**: Use appropriate formats and sizes

### Backend

1. **Database Queries**: Use indexes and avoid N+1 queries
2. **Caching**: Cache frequently accessed data
3. **Async Operations**: Use async/await for I/O operations
4. **Connection Pooling**: Reuse database connections

---

## Security Guidelines

### Frontend

1. **Validate Input**: Sanitize user input before submission
2. **Secure Storage**: Use httpOnly cookies for sensitive tokens
3. **XSS Prevention**: Escape user-generated content
4. **HTTPS Only**: Never send sensitive data over HTTP

### Backend

1. **Input Validation**: Validate all request data with Pydantic
2. **Authentication**: Verify tokens on protected endpoints
3. **SQL Injection**: Use parameterized queries
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Environment Variables**: Never commit secrets to Git

---

## Code Review Checklist

Before submitting code for review:

- [ ] Code follows naming conventions
- [ ] All functions have proper type hints/types
- [ ] Complex logic is commented
- [ ] Error handling is implemented
- [ ] No console.log or print statements left in production code
- [ ] Code is properly formatted (Prettier/Black)
- [ ] No linting errors
- [ ] Tests pass (if applicable)
- [ ] Environment variables in .env.example are updated
- [ ] Documentation is updated

---

## Summary

Following these standards ensures:
- **Consistency** across the codebase
- **Maintainability** for future development
- **Scalability** as the project grows
- **Collaboration** between team members
- **Quality** in production code

Refer to this document regularly during development!
